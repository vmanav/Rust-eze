## Rust-eze: Interactive Platform for Introducing Rust to Python Programmers


The application is already hosted here: [Rust Application](https://thesis-fe-c06n.onrender.com/)
Note: This is a free server instance so the API response time is a bit slow, it is functioning properly but with a noticeably slow repsonse time.


We can follow these steps to run it locally on our system, after cloning the repo
### Prerequisites: Backend
```
// Rust
cd source/backend
curl -fsSL https://sh.rustup.rs | sh
source "$HOME/.cargo/env"

// Python3

// install homebrew if required first
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install python

python3 -m venv venv
python3 -m pip install --upgrade pip
```
#### Run Application

```
cd source/backend
source venv/bin/activate

cd src
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

#### Prerequisites : Frontend

```
// Node.js (18+)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 18.20.4
nvm use 18.20.4
```

#### Run Application

```
cd source/frontend && npm i
npm start
```
