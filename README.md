Emergency Switch - NC - GPIO 1 - RPIA PIN 3
Start Button - NC - GPIO 2 - RPIA PIN 5
Door 1 - NO - GPIO 17 - RPIA PIN 11
Door 2 - NO - GPIO 21 - RPIA PIN 13
Door 3 - NO - GPIO 22 - RPIA PIN 15


# Setup Steps
1. Install Raspbian Minimal
2. Setup ssh key in .ssh/authorized_keys
3. Create dir /opt/server and chown it to pi:pi
4. sudo apt-get update
4. sudo apt-get upgrade
5. Install git-core
5. Install rsync
6. Install nvm
  * curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
7. Install node - nvm install stable
8. allow non root gpio access
git clone git://github.com/quick2wire/quick2wire-gpio-admin.git
cd quick2wire-gpio-admin
make
sudo make install
sudo adduser $USER gpio


# testing images for cam feed
Cam1 - https://i.imgflip.com/1c7628.jpg
Cam2 - https://i.imgflip.com/1c7647.jpg
