import { getCurrentDate } from 'src/common/utils';

export const mockedProjectId = 'mocked-project-id';
export const mockedUserId = 'mocked-user-id';

export const mockedCreateProjectDto = {
  name: 'Project Name',
  description: 'This is a project description',
  startDate: getCurrentDate(),
  endDate: getCurrentDate(),
};

export const mockedProject = {
  uuid: mockedProjectId,
  createdAt: getCurrentDate(),
  updatedAt: getCurrentDate(),
  userId: mockedUserId,
  ...mockedCreateProjectDto,
};
