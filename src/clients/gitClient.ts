import { execSync } from 'child_process';
import { Diff, Commit, Branch } from '../type/git';
const COMMIT_COMMAND = 'git commit -m';
const CURRENT_BRANCH_COMMAND='git branch --show-current'
const DIFF_COMMAND = 'git diff --name-only --cached';

export class GitClient {
  getDiff(): Diff {
    try {
      const filesChanged = execSync(DIFF_COMMAND).toString();
      if (!filesChanged) {
        return createDiffResponse(null, 'No changes to commit, run "git add ."');
      }
      return createDiffResponse(filesChanged, null);
    } catch {
      return createDiffResponse(
        null,
        `Failed to run ${DIFF_COMMAND}.\nPossible cause: Not a git branch`
      );
    }
  }
  commit(message: string): Commit {
    try {
      const response = execSync(`${COMMIT_COMMAND} "${message}"`).toString();
      return createCommitResponse(response, null);
    } catch {
      return createCommitResponse(
        null,
        `Failed to run ${COMMIT_COMMAND}.\nPossible cause: Not a git branch`
      );
    }
  }
  getCurrentBranchName(): Branch {
    try {
      const response = execSync(CURRENT_BRANCH_COMMAND).toString();
      return createBranchResponse(response, null);
    } catch {
      return createBranchResponse(
        null,
        `Failed to run ${COMMIT_COMMAND}.\nPossible cause: Not a git branch`
      );
    }
  }
}

const createDiffResponse = (
  changes: string | null,
  error: string | null
): Diff => ({
  changes,
  error,
});

const createCommitResponse = (
  response: string | null,
  error: string | null
): Commit => ({ response, error });

const createBranchResponse = (
  name: string | null,
  error: string | null
): Branch => ({ name, error });
