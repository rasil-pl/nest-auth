import { TestBed } from '@automock/jest';
import { NotFoundException } from '@nestjs/common';
import { ProjectService } from 'src/modules/project/providers';
import { TaskDto, TasksDto } from 'src/modules/tasks/dtos/task.dto';
import { TasksRepository, TasksService } from 'src/modules/tasks/providers';

import {
  mockedCreateTaskDto,
  mockedFindAllByUserIdResult,
  mockedTask,
  mockedTaskId,
  mockedTaskQueryDto,
  mockedTasksWithPagination,
  mockedUpdateTaskDto,
} from '../../__mocks__';
import {
  mockedProject,
  mockedProjectId,
  mockedUserId,
} from '../../__mocks__/projects.mock';

describe('TasksService', () => {
  let sut: TasksService;
  let mockedTasksRepository: jest.Mocked<TasksRepository>;
  let mockedProjectService: jest.Mocked<ProjectService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(TasksService).compile();
    sut = unit;
    mockedTasksRepository = unitRef.get(TasksRepository);
    mockedProjectService = unitRef.get(ProjectService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Given create method', () => {
    describe('When a valid userId and task payload is provided', () => {
      describe('And a valid projectId is provided', () => {
        test('Then should successfully create a task', async () => {
          mockedProjectService.findOneById.mockResolvedValue(mockedProject);
          mockedTasksRepository.create.mockResolvedValue(mockedTask);
          const result = await sut.create(mockedUserId, mockedCreateTaskDto);
          expect(mockedProjectService.findOneById).toHaveBeenCalledWith(
            mockedProjectId,
          );
          expect(mockedTasksRepository.create).toHaveBeenCalledWith(
            mockedUserId,
            mockedCreateTaskDto,
          );
          expect(result).toBeInstanceOf(TaskDto);
        });
      });

      describe('And an invalid projectId is provided', () => {
        test('Then should throw a NotFoundException', async () => {
          mockedProjectService.findOneById.mockResolvedValue(null);
          await expect(
            sut.create(mockedUserId, mockedCreateTaskDto),
          ).rejects.toThrow(NotFoundException);
          expect(mockedProjectService.findOneById).toHaveBeenCalledWith(
            mockedProjectId,
          );
          expect(mockedTasksRepository.create).not.toHaveBeenCalled();
        });
      });
    });

    describe('When an unexpected error occurs', () => {
      test('Then should propagate the error', async () => {
        mockedProjectService.findOneById.mockRejectedValue(
          new Error('Database error'),
        );
        await expect(
          sut.create(mockedUserId, mockedCreateTaskDto),
        ).rejects.toThrow('Database error');
      });
    });
  });

  describe('Given getAllByUserId method', () => {
    describe('When a valid userId and taskQueryDto is provided', () => {
      test('Then should return paginated task data', async () => {
        mockedTasksRepository.findAllByUserId.mockResolvedValue(
          mockedFindAllByUserIdResult,
        );
        const result = await sut.getAllByUserId(
          mockedUserId,
          mockedTaskQueryDto,
        );
        expect(mockedTasksRepository.findAllByUserId).toHaveBeenCalledWith(
          mockedUserId,
          mockedTaskQueryDto,
        );
        expect(result).toBeInstanceOf(TasksDto);
        expect(result).toStrictEqual(mockedTasksWithPagination);
      });
    });

    describe('When an unexpected error occurs', () => {
      test('Then should propagate the error', async () => {
        mockedTasksRepository.findAllByUserId.mockRejectedValue(
          new Error('Database error'),
        );
        await expect(
          sut.getAllByUserId(mockedUserId, mockedTaskQueryDto),
        ).rejects.toThrow('Database error');
      });
    });
  });

  describe('Given getOneByTaskId method', () => {
    describe('When a valid userId is provided', () => {
      describe('And a valid taskId is provided', () => {
        test('Then should return task data', async () => {
          mockedTasksRepository.findOneByTaskId.mockResolvedValue(mockedTask);
          const result = await sut.getOneByTaskId(mockedUserId, mockedTaskId);
          expect(mockedTasksRepository.findOneByTaskId).toHaveBeenCalledWith(
            mockedUserId,
            mockedTaskId,
          );
          expect(result).toBeInstanceOf(TaskDto);
          expect(result).toStrictEqual(mockedTask);
        });
      });

      describe('And an invalid taskId is provided', () => {
        test('Then should throw NotFoundException', async () => {
          mockedTasksRepository.findOneByTaskId.mockResolvedValue(null);
          await expect(
            sut.getOneByTaskId(mockedUserId, mockedTaskId),
          ).rejects.toThrow(NotFoundException);
        });
      });
    });

    describe('When an unexpected error occurs', () => {
      test('Then should propagate the error', async () => {
        mockedTasksRepository.findOneByTaskId.mockRejectedValue(
          new Error('Database error'),
        );
        await expect(
          sut.getOneByTaskId(mockedUserId, mockedTaskId),
        ).rejects.toThrow('Database error');
      });
    });
  });

  describe('Given updateByTaskId method', () => {
    describe('When a valid userId is provided', () => {
      describe('And a valid updateTaskDto is provided', () => {
        describe('And a valid taskId is provided', () => {
          test('Then should return the updated task data', async () => {
            mockedTasksRepository.updateByTaskId.mockResolvedValue(mockedTask);
            const result = await sut.updateByTaskId(
              mockedUserId,
              mockedTaskId,
              mockedUpdateTaskDto,
            );
            expect(mockedTasksRepository.updateByTaskId).toHaveBeenCalledWith(
              mockedUserId,
              mockedTaskId,
              mockedUpdateTaskDto,
            );
            expect(result).toBeInstanceOf(TaskDto);
            expect(result).toStrictEqual(mockedTask);
          });
        });

        describe('And an invalid taskId is provided', () => {
          test('Then should throw NotFoundException', async () => {
            mockedTasksRepository.updateByTaskId.mockResolvedValue(null);
            await expect(
              sut.updateByTaskId(
                mockedUserId,
                mockedTaskId,
                mockedUpdateTaskDto,
              ),
            ).rejects.toThrow(NotFoundException);
          });
        });
      });
    });

    describe('When an unexpected error occurs', () => {
      test('Then should propagate the error', async () => {
        mockedTasksRepository.updateByTaskId.mockRejectedValue(
          new Error('Database error'),
        );
        await expect(
          mockedTasksRepository.updateByTaskId(
            mockedUserId,
            mockedTaskId,
            mockedUpdateTaskDto,
          ),
        ).rejects.toThrow('Database error');
      });
    });
  });

  describe('Given deleteByTaskId method', () => {
    describe('When a valid userId is provided', () => {
      describe('And a valid taskId is provided', () => {
        test('Then should delete the task', async () => {
          mockedTasksRepository.deleteByTaskId.mockResolvedValue(true);
          await expect(
            sut.deleteByTaskId(mockedUserId, mockedTaskId),
          ).resolves.toBeUndefined();
          expect(mockedTasksRepository.deleteByTaskId).toHaveBeenCalledWith(
            mockedUserId,
            mockedTaskId,
          );
        });
      });

      describe('And an invalid taskId is provided', () => {
        test('Then should throw NotFoundException', async () => {
          mockedTasksRepository.deleteByTaskId.mockResolvedValue(false);
          await expect(
            sut.deleteByTaskId(mockedUserId, mockedTaskId),
          ).rejects.toThrow(NotFoundException);
          expect(mockedTasksRepository.deleteByTaskId).toHaveBeenCalledWith(
            mockedUserId,
            mockedTaskId,
          );
        });
      });
    });

    describe('When an unexpected error occurs', () => {
      test('Then should propagate the error', async () => {
        const mockedError = new Error('Database error');
        mockedTasksRepository.deleteByTaskId.mockRejectedValue(mockedError);
        await expect(
          sut.deleteByTaskId(mockedUserId, mockedTaskId),
        ).rejects.toThrow(mockedError.message);
      });
    });
  });
});
