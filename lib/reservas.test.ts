import { describe, expect, it, vi, beforeEach } from "vitest";

const mockClient = {
  query: vi.fn(),
  release: vi.fn(),
};

vi.mock("@/lib/db", () => ({
  pool: { connect: vi.fn(() => mockClient) },
}));

const { crearReserva, FranjaNoDisponibleError } =
  await import("@/lib/reservas");

describe("crearReserva", () => {
  beforeEach(() => {
    mockClient.query.mockReset();
    mockClient.release.mockReset();
  });
  it("crea una reserva y marca la franja ocupada cuando esta libre", async () => {
    mockClient.query
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce({ rows: [{ id: "franja-1" }] })
      .mockResolvedValueOnce({ rows: [{ id: "reserva-1" }] })
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(undefined);

    const id = await crearReserva("franja-1", "estudiante-1");

    expect(id).toBe("reserva-1");
    expect(mockClient.query).toHaveBeenCalledWith("commit");
    expect(mockClient.release).toHaveBeenCalledTimes(1);
  });

  it("lanza FranjaNoDisponibleError y hace rollback si la franja ya no esta libre", async () => {
    mockClient.query
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce({ rows: [] });
    await expect(crearReserva("franja-1", "estudiante-1")).rejects.toThrow(
      FranjaNoDisponibleError,
    );
    expect(mockClient.query).toHaveBeenCalledWith("rollback");
    expect(mockClient.query).not.toHaveBeenCalledWith("commit");
    expect(mockClient.release).toHaveBeenCalledTimes(1);
  });
});
