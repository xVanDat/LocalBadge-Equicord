# LocalBadges for Equicord

A custom plugin for Equicord that allows you to display custom Discord badges (Staff, Nitro, Server Booster, Bug Hunter, etc.) on specified user profiles. This is entirely client-side, meaning only you can see these badges.

## Features
* Toggle individual badges on/off.
* Specify exactly which User IDs should display the badges.
* Customize the tooltip name for each badge.
* All badge images are embedded as Base64, completely bypassing Discord's Content Security Policy (CSP).

## Installation

**⚠️ Important Note:** You **must** build Equicord from source to use custom userplugins.

1. Clone the Equicord repository:
   ```sh
   git clone https://github.com/Equicord/Equicord
   cd Equicord
   pnpm install
   ```
2. Copy the `LocalBadges` folder into `src/userplugins/`.
3. Build Equicord from source:
   ```sh
   pnpm build
   ```
4. Inject or reload Equicord in your Discord client.
5. Go to User Settings -> Plugins, find `LocalBadges`, and enable it.

## Credits

* Badge image assets were sourced from the [Debuggingss/discord-badges](https://github.com/Debuggingss/discord-badges) repository. All embedded badge images belong to Discord.