import { execSync } from 'child_process';
import { Diffs } from '../type/git';
const GIT_DIFF_COMMAND = 'git diff --name-only';
const GIT_COMMIT_COMMAND = 'git commit -m'

export class GitClient {
  getDiff(): Diffs {
    try {
      const filesChanged = execSync(GIT_DIFF_COMMAND).toString();
      if (!filesChanged) {
        return createDiff(null, 'No changes to commit.');
      }
      return createDiff(filesChanged, null);
    } catch {
      return createDiff(
        null,
        `Failed to run ${GIT_DIFF_COMMAND}.\nPossible cause: Not a git branch`
      );
    }
  }
  commit(message: string){
    try {
      return execSync(`${GIT_COMMIT_COMMAND} ${message}`).toString();
    } catch {
      return createDiff(
        null,
        `Failed to run ${GIT_DIFF_COMMAND}.\nPossible cause: Not a git branch`
      );
    }
  }
}

const createDiff = (changes: string | null, error: string | null): Diffs => ({
  changes,
  error,
});
