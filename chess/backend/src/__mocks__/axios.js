import { jest } from "@jest/globals";

const mockAxios = {
  get: jest.fn().mockResolvedValue({
    status: 200,
    data: {
      game: { pgn: "1. e4 e5" },
      puzzle: { solution: ["Nf3"], rating: 100, id: "test_id" },
    },
  }),
  post: jest.fn(),
};

export default mockAxios;
