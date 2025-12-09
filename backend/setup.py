#!/usr/bin/env python3
"""
Setup script for Fun Fortune Backend
Helps set up the Python environment and dependencies
"""

import subprocess
import sys
import os
from pathlib import Path

def run_command(command, description):
    """Run a shell command and handle errors."""
    print(f"\n{'='*60}")
    print(f"🔄 {description}")
    print(f"{'='*60}\n")
    
    try:
        # Use list format for subprocess to handle spaces in paths
        if isinstance(command, str):
            subprocess.run(command, check=True, shell=True)
        else:
            subprocess.run(command, check=True)
        print(f"\n✅ {description} - SUCCESS")
        return True
    except subprocess.CalledProcessError as e:
        print(f"\n❌ {description} - FAILED")
        print(f"Error: {e}")
        return False

def main():
    print("""
    ╔════════════════════════════════════════════════════╗
    ║     Fun Fortune Backend Setup                      ║
    ║     Python FastAPI Server                          ║
    ╚════════════════════════════════════════════════════╝
    """)
    
    # Check Python version
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required!")
        print(f"Current version: {sys.version}")
        sys.exit(1)
    
    print(f"✅ Python version: {sys.version.split()[0]}")
    
    # Check if we're in the backend directory
    if not Path("main.py").exists():
        print("❌ Please run this script from the backend directory!")
        sys.exit(1)
    
    # Create virtual environment
    if not Path("venv").exists():
        if not run_command(
            [sys.executable, "-m", "venv", "venv"],
            "Creating virtual environment"
        ):
            sys.exit(1)
    else:
        print("\n✅ Virtual environment already exists")
    
    # Determine the correct pip path
    if sys.platform == "win32":
        pip_path = str(Path("venv/Scripts/pip.exe").absolute())
        python_path = str(Path("venv/Scripts/python.exe").absolute())
    else:
        pip_path = str(Path("venv/bin/pip").absolute())
        python_path = str(Path("venv/bin/python").absolute())
    
    # Upgrade pip
    run_command(
        [python_path, "-m", "pip", "install", "--upgrade", "pip"],
        "Upgrading pip"
    )
    
    # Install requirements
    if not run_command(
        [pip_path, "install", "-r", "requirements.txt"],
        "Installing Python dependencies"
    ):
        sys.exit(1)
    
    # Create .env file if it doesn't exist
    if not Path(".env").exists():
        if Path(".env.example").exists():
            print("\n📝 Creating .env file from .env.example...")
            with open(".env.example", "r") as src, open(".env", "w") as dst:
                dst.write(src.read())
            print("✅ .env file created!")
            print("\n⚠️  IMPORTANT: Edit .env and add your GEMINI_API_KEY")
        else:
            print("\n⚠️  .env.example not found. Please create .env manually.")
    else:
        print("\n✅ .env file already exists")
    
    # Final instructions
    editor_cmd = "notepad .env" if sys.platform == "win32" else "nano .env"
    activate_cmd = "venv\\Scripts\\Activate.ps1" if sys.platform == "win32" else "source venv/bin/activate"
    
    print(f"""
    
    ╔════════════════════════════════════════════════════╗
    ║     Setup Complete! 🎉                             ║
    ╚════════════════════════════════════════════════════╝
    
    Next steps:
    
    1. Edit the .env file and add your GEMINI_API_KEY:
       {editor_cmd}
    
    2. Activate the virtual environment:
       {activate_cmd}
    
    3. Run the server:
       python main.py
    
    4. Access the API:
       - API: http://localhost:8000
       - Docs: http://localhost:8000/docs
    
    Happy coding! ✨
    """)

if __name__ == "__main__":
    main()
