# Installing Alusus on Linux and Running Hello World

This guide explains a simple Linux setup flow for Alusus, followed by a minimal Hello World test.

## Requirements

According to the official download page, Alusus installation packages are provided for recent Linux distributions, including:
- Ubuntu 20.04 or newer
- other recent Linux distributions that support the package format

## Step 1: Download the Package

Visit the official download page and choose the Linux package that matches your system.

Common package types:
- `.deb` for Debian/Ubuntu-based systems
- `.rpm` for Fedora/RHEL-like systems

## Step 2: Install Alusus

### Debian/Ubuntu

```bash
sudo apt install ./alusus_<version>_amd64.deb
```

### Fedora / RPM-based systems

```bash
sudo dnf install ./alusus-<version>.x86_64.rpm
```

The official documentation states that Alusus installs under `/opt/Alusus` and places symlinks for executables under `/usr/local/bin`.

## Step 3: Verify the Installation

Check that the command is available:

```bash
alusus --help
```

If that does not work, try locating the binaries in:
- `/usr/local/bin`
- `/opt/Alusus`

## Step 4: Create a Hello World File

Create a file named `hello.alusus`:

```alusus
import "Srl/Console.alusus";
use Srl;

Console.print("Hello World!\n");
```

## Step 5: Run the Program

```bash
alusus hello.alusus
```

If everything is correct, the terminal should print:

```text
Hello World!
```

## Optional Debug Run

If you built a debug version of Alusus from source, the documentation notes that logging can be enabled with:

```bash
alusus.dbg --log 16 hello.alusus
```

## Troubleshooting

### Command not found
Make sure the package installed successfully and the binary symlink exists.

### Permission issues
Use `sudo` during installation, not during normal source editing.

### Wrong package format
Use `.deb` on Debian/Ubuntu and `.rpm` on Fedora-like systems.

## Next Steps

After Hello World:
1. read the Introduction tutorial,
2. learn variables and strings,
3. practice functions,
4. build a simple command-line program,
5. then move to web apps with WebPlatform.
