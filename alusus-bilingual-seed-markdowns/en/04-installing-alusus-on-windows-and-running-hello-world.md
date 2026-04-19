# Installing Alusus on Windows and Running Hello World

This guide covers a practical Windows setup flow for Alusus and a basic Hello World test.

## Step 1: Download Alusus for Windows

Open the official download page and choose the Windows package. The current official guidance says to:
1. download the package,
2. extract it to a folder,
3. then run the bundled setup executable.

## Step 2: Run the Installer

After extraction, run:

```text
setup.exe
```

Follow the installer steps until completion.

## Step 3: Verify the Installation

Open Command Prompt or PowerShell and check:

```powershell
alusus --help
```

If the command is not found, restart the terminal and make sure the installer completed successfully.

## Step 4: Create a Hello World File

Create `hello.alusus` with the following content:

```alusus
import "Srl/Console.alusus";
use Srl;

Console.print("Hello World!\n");
```

## Step 5: Run the File

In the directory containing the file:

```powershell
alusus hello.alusus
```

Expected output:

```text
Hello World!
```

## Suggested Folder Layout

```text
C:\AlususProjects\HelloWorld\
  hello.alusus
```

## Troubleshooting

### `alusus` is not recognized
Close and reopen the terminal after installation. If needed, verify the installation path from the setup process.

### Wrong file extension
Make sure the file is saved as `.alusus`, not `.txt`.

### No output
Check the file content and ensure the command is run in the correct directory.

## Next Steps

After Hello World:
- read the official documentation portal,
- learn variables, loops, and strings,
- build a small console app,
- then explore Alusus web development.
