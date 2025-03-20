import { plainToInstance } from 'class-transformer';
import { getCurrentDate } from 'src/common/utils';
import { TaskPriority, TaskStatus } from 'src/modules/tasks/enums';

import { SortDirection } from '../../src/common/enums';
import { TaskDto, TasksDto } from '../../src/modules/tasks/dtos/task.dto';
import { mockedProjectId } from './projects.mock';

export const mockedTaskUserId = 'mock-task-user-id';
export const mockedTaskProjectId = 'mock-task-project-id';
export const mockedTaskId = 'mock-task-id';

export const mockedCreateTaskDto = {
  title: 'Mocked title',
  description: 'Mocked description',
  status: TaskStatus.IN_PROGRESS,
  dueDate: getCurrentDate(),
  priority: TaskPriority.MEDIUM,
  projectId: mockedProjectId,
};

export const mockedCreatedTask = {
  ...mockedCreateTaskDto,
  id: mockedTaskId,
};

export const mockedUpdateTaskDto = {
  title: 'Mocked title updated',
  description: 'Mocked description updated',
  status: TaskStatus.DONE,
  dueDate: getCurrentDate(),
  priority: TaskPriority.HIGH,
  projectId: mockedProjectId,
};

export const mockedTask = plainToInstance(TaskDto, {
  uuid: mockedTaskId,
  title: 'Task 2',
  description: 'Task description 2',
  status: TaskStatus.DONE,
  dueDate: getCurrentDate(),
  priority: TaskPriority.MEDIUM,
  userId: mockedTaskUserId,
  projectId: mockedTaskProjectId,
  createdAt: getCurrentDate(),
  updatedAt: getCurrentDate(),
});

export const mockedTaskPaginationMeta = {
  page: 1,
  limit: 10,
  total: 10,
  totalPages: 1,
};

export const mockedTasksWithPagination = plainToInstance(TasksDto, {
  data: [mockedTask],
  meta: mockedTaskPaginationMeta,
});

export const mockedFindAllByUserIdResult = {
  data: [mockedTask],
  page: 1,
  limit: 10,
  total: 10,
};

export const mockedTaskQueryDto = {
  page: 1,
  limit: 10,
  projectId: mockedProjectId,
  status: TaskStatus.DONE,
  priority: TaskPriority.MEDIUM,
  startDate: getCurrentDate(),
  endDate: getCurrentDate(),
  sortBy: 'createdAt',
  sortDirection: SortDirection.DESC,
};
