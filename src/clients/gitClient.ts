import { execSync } from 'child_process';
import { Diffs, Commit } from '../type/git';
const GIT_DIFF_COMMAND = 'git diff --name-only --cached';
const GIT_COMMIT_COMMAND = 'git commit -m';

export class GitClient {
  getDiff(): Diffs {
    try {
      const filesChanged = execSync(GIT_DIFF_COMMAND).toString();
      if (!filesChanged) {
        return createDiffResponse(null, 'No changes to commit, run "git add ."');
      }
      return createDiffResponse(filesChanged, null);
    } catch {
      return createDiffResponse(
        null,
        `Failed to run ${GIT_DIFF_COMMAND}.\nPossible cause: Not a git branch`
      );
    }
  }
  commit(message: string): Commit {
    try {
      const response = execSync(`${GIT_COMMIT_COMMAND} "${message}"`).toString();
      return createCommitResponse(response, null);
    } catch {
      return createCommitResponse(
        null,
        `Failed to run ${GIT_DIFF_COMMAND}.\nPossible cause: Not a git branch`
      );
    }
  }
}

const createDiffResponse = (
  changes: string | null,
  error: string | null
): Diffs => ({
  changes,
  error,
});

const createCommitResponse = (
  response: string | null,
  error: string | null
): Commit => ({ response, error });
