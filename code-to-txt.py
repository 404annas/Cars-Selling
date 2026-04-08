import os
import argparse

# --- Configuration ---
EXCLUDED_DIRS = {
    '.git', 'node_modules', '.next',
    '__pycache__', 'dist', 'build',
    '.vscode', '.idea', 'test-reports',
    'tests', 'reporters'
}

EXCLUDED_EXTENSIONS = {
    '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.ico', '.svg',
    '.pdf', '.doc', '.docx', '.xls', '.xlsx',
    '.zip', '.rar', '.gz', '.tar',
    '.exe', '.dll', '.so', '.o', '.jar',
    '.mp4', '.mov', '.avi',
    '.mp3', '.wav', '.lock', '.test.js'
}

# Convert once (important)
EXCLUDED_DIRS = {d.lower() for d in EXCLUDED_DIRS}
EXCLUDED_EXTENSIONS = {e.lower() for e in EXCLUDED_EXTENSIONS}


def process_project(root_dir, output_file_path):
    print("--- SCRIPT STARTING ---")
    print(f"Project Directory: {os.path.abspath(root_dir)}")

    if os.path.exists(output_file_path):
        os.remove(output_file_path)

    with open(output_file_path, 'w', encoding='utf-8') as output_file:
        output_file.write("PROJECT STRUCTURE:\n====================\n\n")
        output_file.write("FILE CONTENTS:\n==============\n\n")

        for root, dirs, files in os.walk(root_dir, topdown=True):

            # 🚀 Proper directory filtering
            dirs[:] = [
                d for d in dirs
                if d.lower() not in EXCLUDED_DIRS
            ]

            level = root.replace(root_dir, '').count(os.sep)
            if level > 0:
                output_file.write(f"{' ' * 4 * (level-1)}└── {os.path.basename(root)}/\n")

            sub_indent = ' ' * 4 * (level + 1)

            # 📁 Write structure
            for f in sorted(files):
                if not any(f.lower().endswith(ext) for ext in EXCLUDED_EXTENSIONS):
                    output_file.write(f"{sub_indent}├── {f}\n")

            # 📄 Write file content
            for filename in sorted(files):
                if any(filename.lower().endswith(ext) for ext in EXCLUDED_EXTENSIONS):
                    continue

                file_path = os.path.join(root, filename)
                relative_path = os.path.relpath(file_path, root_dir)

                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()

                    output_file.write(f"\n--- START OF FILE: {relative_path} ---\n\n")
                    output_file.write(content)
                    output_file.write(f"\n\n--- END OF FILE: {relative_path} ---\n\n" + "="*80 + "\n\n")

                except Exception as e:
                    output_file.write(f"\n--- Could not read file: {relative_path} ({e}) ---\n\n" + "="*80 + "\n\n")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("project_dir", type=str)
    parser.add_argument("output_file", nargs='?', default="combined_project_code.txt")
    args = parser.parse_args()

    if not os.path.isdir(args.project_dir):
        print("Directory not found")
        return

    process_project(args.project_dir, args.output_file)
    print("✅ DONE")


if __name__ == "__main__":
    main()