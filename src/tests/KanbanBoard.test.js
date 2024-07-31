import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import KanbanBoard from "../components/KanbanBoard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("KanbanBoard Component", () => {
  it("초기 랜더링 테스트", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <KanbanBoard />
      </QueryClientProvider>
    );

    expect(screen.getByText("잠시만 기다려주세요...")).toBeInTheDocument();
  });

  it("새 작업 추가 후 상태가 업데이트되었는지 확인", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <KanbanBoard />
      </QueryClientProvider>
    );

    const addTaskButton = await screen.findByRole("button", {
      name: /Add Task/i,
    });
    expect(addTaskButton).toBeInTheDocument();
    fireEvent.click(addTaskButton);

    const input = screen.getByPlaceholderText("내용을 입력해 주세요");
    fireEvent.change(input, { target: { value: "새 작업" } });
    fireEvent.keyPress(input, { key: "Enter", code: "Enter", charCode: 13 });
  });
});
