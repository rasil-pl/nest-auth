import { TestBed } from '@automock/jest';
import { ProjectDto } from 'src/modules/project/dtos/project.dto';
import {
  ProjectRepository,
  ProjectService,
} from 'src/modules/project/providers';

import {
  mockedCreateProjectDto,
  mockedProject,
  mockedUserId,
} from '../../__mocks__/projects.mock';

describe('ProjectService', () => {
  let sut: ProjectService;
  let mockedProjectRepository: jest.Mocked<ProjectRepository>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(ProjectService).compile();
    sut = unit;
    mockedProjectRepository = unitRef.get(ProjectRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Given create method', () => {
    describe('When a valid userId is provided', () => {
      describe('And a valid project payload is provided', () => {
        test('Then should successfully create a new project', async () => {
          mockedProjectRepository.create.mockResolvedValue(mockedProject);
          const result = await sut.create(mockedUserId, mockedCreateProjectDto);
          expect(mockedProjectRepository.create).toHaveBeenCalledWith(
            mockedUserId,
            mockedCreateProjectDto,
          );
          expect(result).toBeInstanceOf(ProjectDto);
        });
      });
    });
  });
});
