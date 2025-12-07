// This helper reacts to assistant JSON commands and handles goal creation.
import { setPendingGoal } from "./pending-goal-store";

type RouterLike = {
  push: (href: string) => void;
};

type AssistantCommandPayload = {
  command?: string;
  learningGoal?: unknown;
};

// This stores the goal and redirects when the assistant sends create_learning_goal.
export function handleAssistantGoalCommand(
  assistantCommand: AssistantCommandPayload | null | undefined,
  router: RouterLike,
  options?: { hasRedirected?: boolean; markRedirected?: () => void }
): boolean {
  if (!assistantCommand || typeof assistantCommand !== "object") {
    return false;
  }

  if (assistantCommand.command !== "create_learning_goal") {
    return false;
  }

  const learningGoal = assistantCommand.learningGoal;
  if (typeof learningGoal !== "string") {
    return false;
  }

  const trimmedGoal = learningGoal.trim();
  if (!trimmedGoal) {
    return false;
  }

  if (options?.hasRedirected) {
    return false;
  }

  setPendingGoal(trimmedGoal);
  options?.markRedirected?.();

  try {
    router.push("/learning-goal-confirmation");
  } catch {
    // Ignore navigation errors in non-browser environments.
  }

  return true;
}

// This alias makes the handler easy to import in tests.
export const handleAssistantCommandForTest = handleAssistantGoalCommand;
