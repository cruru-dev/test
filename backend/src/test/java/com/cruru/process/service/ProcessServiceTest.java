package com.cruru.process.service;

import static com.cruru.util.fixture.ApplicantFixture.createPendingApplicantDobby;
import static com.cruru.util.fixture.DashboardFixture.createBackendDashboard;
import static com.cruru.util.fixture.ProcessFixture.createFinalProcess;
import static com.cruru.util.fixture.ProcessFixture.createFirstProcess;
import static com.cruru.util.fixture.ProcessFixture.createInterviewProcess;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.cruru.applicant.domain.Applicant;
import com.cruru.applicant.domain.repository.ApplicantRepository;
import com.cruru.dashboard.domain.Dashboard;
import com.cruru.dashboard.domain.repository.DashboardRepository;
import com.cruru.dashboard.exception.DashboardNotFoundException;
import com.cruru.evaluation.domain.Evaluation;
import com.cruru.evaluation.domain.repository.EvaluationRepository;
import com.cruru.process.controller.dto.ProcessCreateRequest;
import com.cruru.process.controller.dto.ProcessResponse;
import com.cruru.process.controller.dto.ProcessUpdateRequest;
import com.cruru.process.controller.dto.ProcessesResponse;
import com.cruru.process.domain.Process;
import com.cruru.process.domain.repository.ProcessRepository;
import com.cruru.process.exception.badrequest.ProcessCountException;
import com.cruru.process.exception.badrequest.ProcessDeleteEndsException;
import com.cruru.process.exception.badrequest.ProcessDeleteRemainingApplicantException;
import com.cruru.process.exception.badrequest.ProcessNoChangeException;
import com.cruru.util.ServiceTest;
import com.cruru.util.fixture.ProcessFixture;
import java.util.Comparator;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayName("프로세스 서비스 테스트")
class ProcessServiceTest extends ServiceTest {

    @Autowired
    private DashboardRepository dashboardRepository;

    @Autowired
    private ProcessRepository processRepository;

    @Autowired
    private ApplicantRepository applicantRepository;

    @Autowired
    private ProcessService processService;

    @Autowired
    private EvaluationRepository evaluationRepository;

    @DisplayName("새로운 프로세스를 생성한다.")
    @Test
    void create() {
        // given
        Dashboard dashboard = dashboardRepository.save(createBackendDashboard());
        processRepository.save(createFirstProcess(dashboard));
        processRepository.save(createFinalProcess(dashboard));
        ProcessCreateRequest processCreateRequest = new ProcessCreateRequest("새로운 프로세스", "원래 있던 2개의 프로세스 사이에 생겼다.", 1);

        // when
        processService.create(processCreateRequest, dashboard);

        // then
        List<Process> allByDashboardId = processRepository.findAllByDashboardId(dashboard.getId())
                .stream()
                .sorted(Comparator.comparingInt(Process::getSequence))
                .toList();

        String actualName = allByDashboardId.get(1).getName();
        assertAll(() -> {
            assertThat(allByDashboardId).hasSize(3);
            assertThat(actualName).isEqualTo("새로운 프로세스");
        });
    }

    @DisplayName("프로세스 최대 개수를 초과하면, 예외가 발생한다.")
    @Test
    void createOverProcessMaxCount() {
        // given
        Dashboard dashboard = dashboardRepository.save(createBackendDashboard());
        processRepository.saveAll(ProcessFixture.maxSizeOf(dashboard));
        ProcessCreateRequest processCreateRequest = new ProcessCreateRequest("2차 면접", "화상 면접", 1);

        // when&then
        assertThatThrownBy(() -> processService.create(processCreateRequest, dashboard))
                .isInstanceOf(ProcessCountException.class);
    }

    @DisplayName("대시보드에 존재하는 첫 번째 프로세스를 조회한다.")
    @Test
    void findFirstProcessOnDashboard() {
        // given
        Dashboard dashboard = dashboardRepository.save(createBackendDashboard());
        Process firstProcess = processRepository.save(createFirstProcess(dashboard));
        processRepository.save(createInterviewProcess(dashboard));
        processRepository.save(createFinalProcess(dashboard));

        // when
        Process actualFirstProcess = processService.findFirstProcessOnDashboard(dashboard);

        // then
        assertThat(actualFirstProcess).isEqualTo(firstProcess);
    }

    @DisplayName("기존 정보에서 변경점이 있는 변경 요청시, 프로세스 정보를 변경한다.")
    @Test
    void update() {
        // given
        Dashboard dashboard = dashboardRepository.save(createBackendDashboard());
        Process process = processRepository.save(createFirstProcess(dashboard));
        ProcessUpdateRequest processUpdateRequest = new ProcessUpdateRequest("면접 수정", "수정된 설명");

        // when
        Long processId = process.getId();
        processService.update(processUpdateRequest, processId);

        // then
        Process actualProcess = processRepository.findById(processId).get();
        assertAll(() -> {
            assertThat(actualProcess.getName()).isEqualTo(processUpdateRequest.name());
            assertThat(actualProcess.getDescription()).isEqualTo(processUpdateRequest.description());
        });
    }

    @DisplayName("기존 정보에서 변경점이 없는 요청시, 예외가 발생한다.")
    @Test
    void update_ThrowException() {
        // given
        Dashboard dashboard = dashboardRepository.save(createBackendDashboard());
        Process process = processRepository.save(createFirstProcess(dashboard));
        String notChangedName = process.getName();
        String notChangedDescription = process.getDescription();
        ProcessUpdateRequest processUpdateRequest = new ProcessUpdateRequest(notChangedName, notChangedDescription);

        Long processId = process.getId();

        // when & then
        assertThatThrownBy(() -> processService.update(processUpdateRequest, processId))
                .isInstanceOf(ProcessNoChangeException.class);
    }

    @DisplayName("프로세스를 삭제한다.")
    @Test
    void delete() {
        // given
        Dashboard dashboard = dashboardRepository.save(createBackendDashboard());
        Process process = processRepository.save(createInterviewProcess(dashboard));

        // when
        processService.delete(process.getId());

        // then
        assertThat(processRepository.findAll()).isEmpty();
    }

    @DisplayName("첫번째 프로세스 혹은 마지막 프로세스를 삭제하면 예외가 발생한다.")
    @Test
    void delete_FirstOrLastProcess_ThrowsException() {
        // given
        Dashboard dashboard = dashboardRepository.save(createBackendDashboard());
        Process firstProcess = processRepository.save(createFirstProcess(dashboard));
        Process finalProcess = processRepository.save(createFinalProcess(dashboard));

        // when & then
        Long firstProcessId = firstProcess.getId();
        Long finalProcessId = finalProcess.getId();
        assertAll(() -> {
            assertThatThrownBy(() -> processService.delete(firstProcessId)).isInstanceOf(ProcessDeleteEndsException.class);
            assertThatThrownBy(() -> processService.delete(finalProcessId)).isInstanceOf(ProcessDeleteEndsException.class);
        });
    }

    @DisplayName("삭제하려는 프로세스에 해당되는 지원자가 있을 경우 예외가 발생한다.")
    @Test
    void delete_ApplicantRemainedProcess_ThrowsException() {
        // given
        Dashboard dashboard = dashboardRepository.save(createBackendDashboard());
        Process process = processRepository.save(createInterviewProcess(dashboard));
        applicantRepository.save(createPendingApplicantDobby(process));

        // when&then
        Long processId = process.getId();
        assertThatThrownBy(() -> processService.delete(processId)).isInstanceOf(ProcessDeleteRemainingApplicantException.class);
    }
}
