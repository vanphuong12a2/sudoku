import fetchMock from 'fetch-mock';
import {generateBoard, getIllegalCellsMap, solveBoard} from './boardFunctions';
import {finishBoard, sampleBoardData} from './testData';

describe('board functions', () => {

    const generateUrl = '/api/board/random';
    const solveUrl = '/api/board/solved';

    beforeEach(() => {
        fetchMock.restore();
    });

    it('should fetch random board from the backend', async () => {
        fetchMock.mock(generateUrl, '[0,8,0,0,5,1,0,0,0,0,0,0,6,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,8,0,5,5,0,7,4,0,0,0,0,0,0,0,0,0,0,0,1,0,0,4,0,6,0,0,0,0,7,0,0,0,0,0,3,5,0,0,0,2,0,0,0,0,0,0,0,0]');

        const expectedBoard = sampleBoardData();

        await generateBoard()
            .then(board => expect(board).toEqual(expectedBoard))
            .catch((error) => fail(error));

    });

    it('should fetch solution from the backend', async () => {
        fetchMock.mock(`${solveUrl}?inputBoard=0,8,0,0,5,1,0,0,0,0,0,0,6,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,8,0,5,5,0,7,4,0,0,0,0,0,0,0,0,0,0,0,1,0,0,4,0,6,0,0,0,0,7,0,0,0,0,0,3,5,0,0,0,2,0,0,0,0,0,0,0,0`,
            '[7,8,2,3,5,1,9,6,4,1,4,5,6,9,7,3,2,8,3,6,9,8,2,4,7,5,1,6,3,1,9,7,2,8,4,5,5,9,7,4,1,8,6,3,2,8,2,4,5,6,3,1,9,7,4,5,6,1,8,9,2,7,3,9,7,8,2,3,5,4,1,6,2,1,3,7,4,6,5,8,9]');

        const inputBoard = sampleBoardData();
        const expectedBoard = finishBoard();

        await solveBoard(inputBoard)
            .then(board => expect(board).toEqual(expectedBoard))
            .catch((error) => fail(error));
    });

    it('should return illegal cells', () => {
        const inputBoard = [
            [8, 8, 0, 0, 5, 1, 0, 0, 0],
            [0, 0, 0, 6, 0, 0, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 0, 0, 4, 8, 0, 5],
            [5, 0, 7, 4, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0],
            [4, 0, 6, 0, 0, 0, 0, 7, 0],
            [0, 0, 0, 0, 3, 5, 0, 0, 0],
            [2, 0, 0, 0, 0, 0, 0, 0, 5]];

        expect(getIllegalCellsMap(inputBoard)).toEqual([
            [-1, -1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, -1, 0, 0, -1],
            [0, 0, 0, -1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, -1]]
        );
    });
});