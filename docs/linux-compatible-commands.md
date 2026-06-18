# Linux-Compatible Commands In PowerShell

This file documents Linux-style commands that are available in this PowerShell environment and can be considered before falling back to PowerShell-native alternatives.

## Usage Rule

Before using a PowerShell-native command for a common shell task, check whether one of the commands below is available and appropriate for the task.

- Prefer `rg` when searching text or files, as already defined in `AGENTS.md`.
- Use the Linux-style command only when it keeps the command simpler or clearer.
- For destructive commands such as `rm`, `mv`, `cp`, `mkdir`, `truncate`, `unlink` or `rmdir`, apply the same safety standards as any other filesystem operation.

## Available Commands

| Command | Description |
| --- | --- |
| `arch` | Display machine architecture. |
| `b2sum` | Print or check BLAKE2b checksums. |
| `base32` | Encode or decode data using base32 and print to standard output. |
| `base64` | Encode or decode data using base64 and print to standard output. |
| `basename` | Print `NAME` with any leading directory components removed. |
| `basenc` | Encode or decode data using one of several base encodings. |
| `cat` | Concatenate files or standard input to standard output. |
| `cksum` | Print CRC and size for each file. |
| `comm` | Compare two sorted files line by line. |
| `cp` | Copy source to destination, or multiple sources to a directory. |
| `csplit` | Split a file into sections determined by context lines. |
| `cut` | Print specified byte or field columns from each line of input. |
| `date` | Print or set the system date and time. |
| `df` | Show information about the file system on which each file resides. |
| `dirname` | Strip the last component from a file name. |
| `du` | Estimate file space usage. |
| `echo` | Display a line of text. |
| `env` | Set environment values and run a command. |
| `expr` | Print the value of an expression to standard output. |
| `factor` | Print the prime factors of the given numbers. |
| `false` | Make a command always exit with `1`. |
| `find` | Search for files in a directory hierarchy. |
| `fmt` | Reformat paragraphs from input to standard output. |
| `fold` | Wrap each input line to fit a specified width. |
| `grep` | Print lines that match patterns. |
| `head` | Print the first 10 lines of each file to standard output. |
| `hostname` | Display or set the system host name. |
| `join` | Join two files on a common field. |
| `la` | List directory contents including hidden entries. |
| `link` | Create a link named `FILE2` to an existing `FILE1`. |
| `ln` | Make links between files. |
| `ls` | List directory contents. |
| `md5sum` | Print or check MD5 checksums. |
| `mkdir` | Create the given directories if they do not exist. |
| `mktemp` | Create a temporary file or directory. |
| `mv` | Move source to destination, or multiple sources to a directory. |
| `nl` | Number lines of files. |
| `nproc` | Print the number of cores available to the current process. |
| `numfmt` | Convert numbers from or to human-readable strings. |
| `od` | Dump files in octal and other formats. |
| `pathchk` | Check whether file names are valid or portable. |
| `pr` | Paginate or columnate files for printing. |
| `printenv` | Display environment variable values. |
| `printf` | Print output based on a format string and arguments. |
| `ptx` | Produce a permuted index of file contents. |
| `pwd` | Display the full filename of the current working directory. |
| `readlink` | Print the value of a symbolic link or canonical file name. |
| `realpath` | Print the resolved absolute path. |
| `rm` | Remove files. |
| `rmdir` | Remove directories if they are empty. |
| `seq` | Display numbers from first to last in steps. |
| `sha1sum` | Print or check SHA1 checksums. |
| `sha224sum` | Print or check SHA224 checksums. |
| `sha256sum` | Print or check SHA256 checksums. |
| `sha384sum` | Print or check SHA384 checksums. |
| `sha512sum` | Print or check SHA512 checksums. |
| `shuf` | Shuffle the input by outputting a random permutation of lines. |
| `sleep` | Pause for a number of seconds. |
| `sort` | Display sorted concatenation of file content. |
| `split` | Create output files containing sections of input. |
| `stat` | Display file or file-system status. |
| `sum` | Checksum and count the blocks in a file. |
| `tac` | Write each file to standard output, last line first. |
| `tail` | Print the last 10 lines of each file to standard output. |
| `tee` | Copy standard input to files and standard output. |
| `test` | Check file types and compare values. |
| `touch` | Update access and modification times of files. |
| `tr` | Translate or delete characters. |
| `true` | Make a command always exit with `0`. |
| `truncate` | Shrink or extend the size of each file to a specified size. |
| `tsort` | Topological sort of strings in a file. |
| `unexpand` | Convert blanks in files to tabs. |
| `uniq` | Report or omit repeated lines. |
| `unlink` | Unlink the file at a given path. |
| `uptime` | Display current time, uptime, user count and load averages. |
| `wc` | Print newline, word and byte counts for each file. |
| `xargs` | Build and execute command lines from standard input. |
| `yes` | Repeatedly display a line with a string or `y`. |
