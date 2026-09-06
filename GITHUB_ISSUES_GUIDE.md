# GitHub Issues Guide for AI Agents

Welcome, AI Agent! This repository uses GitHub Issues to meticulously track progress, manage tasks, and organize milestones. To maintain a clean and structured project history, you must adhere to the following guidelines whenever you begin a new chat or undertake a task.

## 1. Always Check Before Creating
Before creating a new issue, always search the repository's existing issues (both open and closed) to ensure you are not creating a duplicate.
- If an issue already exists for the task, update it with a comment acknowledging you are starting work on it.
- If no issue exists, proceed to create a new one.

## 2. Creating New Issues
When creating a new issue, ensure it is clear, objective, and well-structured.
- **Title**: Use a concise and descriptive title. Prefix with the type of work (e.g., `feat:`, `fix:`, `refactor:`, `docs:`). Example: `feat: implement user authentication flow`.
- **Description**: Include the following sections:
  - **Objective**: What is being accomplished.
  - **Tasks**: A markdown checklist of the specific steps required to complete the issue.
  - **Context**: Any relevant background information or links to other issues/discussions.
- **Labels**: Apply appropriate labels (e.g., `enhancement`, `bug`, `documentation`, `frontend`, `backend`).
- **Milestones**: If the repository uses milestones, always assign the issue to the current active milestone.
- **Assignees**: Assign the issue to the relevant user or yourself if applicable.

## 3. Updating Progress
As you work on the task across multiple steps or chats, keep the issue updated to reflect your progress.
- Check off items in the task list as they are completed.
- If you encounter significant roadblocks, change scope, or make design decisions, document them as comments on the issue.

## 4. Pull Requests and Linking
When your work results in a Pull Request (PR) or code changes:
- Always link the PR to the relevant issue(s) using closing keywords in the PR description (e.g., `Closes #123`, `Fixes #456`).
- If you are directly committing to a branch that syncs automatically, ensure your commit messages reference the issue number (e.g., `feat: add login page (#123)`).

## 5. Closing Issues
- Only close an issue when all tasks in the checklist are fully completed and the associated code is merged or deployed.
- If closing an issue manually without a PR, leave a brief comment summarizing the resolution or linking to the relevant commit.

## Reminder for AI Agents
Discipline is key. Before writing code for a new request, your first action should be managing the corresponding GitHub issue. By following these guidelines, you ensure the project remains organized, milestones are accurate, and the development history is easy for human developers to follow.
