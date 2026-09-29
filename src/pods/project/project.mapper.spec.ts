import { mapProjectFromApiToVm } from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

describe('./pods/project/project.mapper', () => {
  it('should return empty project when feeding null value', () => {
    // Arrange
    const project = null;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return empty project when feeding undefined value', () => {
    // Arrange
    const project = undefined;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return expected result with empty employees when feeding null employee list', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: null,
    };

    const expectedResult: viewModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return expected result with empty employees when feeding undefined employee list', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: undefined,
    };

    const expectedResult: viewModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return expected result when feeding project without optional fields', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      name: 'test name',
      isActive: false,
      employees: [],
    };

    const expectedResult: viewModel.Project = {
      id: 'test id',
      name: 'test name',
      isActive: false,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return expected result when feeding correct values', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: [
        { id: 'employee id 1', employeeName: 'employee name 1', isAssigned: true },
        { id: 'employee id 2', employeeName: 'employee name 2', isAssigned: false },
      ],
    };

    const expectedResult: viewModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: [
        { id: 'employee id 1', employeeName: 'employee name 1', isAssigned: true },
        { id: 'employee id 2', employeeName: 'employee name 2', isAssigned: false },
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return a new employees array, not the same reference', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      name: 'test name',
      isActive: true,
      employees: [{ id: 'employee id', employeeName: 'employee name' }],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result.employees).not.toBe(project.employees);
    expect(result.employees[0]).not.toBe(project.employees[0]);
  });
});