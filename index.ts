import { addProfileBadge, BadgePosition, ProfileBadge, removeProfileBadge } from "@api/Badges";
import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { AVAILABLE_BADGES } from "./badges";

const settingsFields: Record<string, any> = {};

settingsFields["targetUserIds"] = {
    type: OptionType.STRING,
    description: "User IDs to display badges on (comma-separated). Example: 123456789,987654321",
    default: "",
};

settingsFields["badgePosition"] = {
    type: OptionType.SELECT,
    description: "Badge Position in the badge row",
    options: [
        { label: "Start (Before Discord badges)", value: "START", default: true },
        { label: "End (After Discord badges)", value: "END" },
    ],
};

for (const badge of AVAILABLE_BADGES) {
    settingsFields[badge.id] = {
        type: OptionType.BOOLEAN,
        description: `Show: ${badge.label}`,
        default: false,
    };
    settingsFields[`${badge.id}_name`] = {
        type: OptionType.STRING,
        description: `Custom name for ${badge.label} (leave blank for default)`,
        default: "",
    };
}

const settings = definePluginSettings(settingsFields);
const registeredBadges: ProfileBadge[] = [];

export default definePlugin({
    name: "LocalBadges",
    description: "Display custom badges on specified profiles (client-side only). Go to Settings to configure user IDs.",
    authors: [{
        name: "xVanDat",
        id: 0n,
    }],

    settings,

    start() {
        const position = settings.store.badgePosition === "END"
            ? BadgePosition.END
            : BadgePosition.START;

        const targetIdsRaw = settings.store.targetUserIds as string | undefined;
        const targetIds = (targetIdsRaw || "").split(",").map(id => id.trim()).filter(id => id.length > 0);

        for (const def of AVAILABLE_BADGES) {
            if (!settings.store[def.id]) continue;

            const customName = settings.store[`${def.id}_name`] as string | undefined;
            const finalDescription = customName && customName.trim() !== "" ? customName.trim() : def.description;

            const badge: ProfileBadge = {
                id: `local_${def.id}`,
                description: finalDescription,
                iconSrc: def.icon,
                position,
                shouldShow: ({ userId }) => {
                    if (targetIds.length === 0) return false;
                    return targetIds.includes(userId);
                },
                onClick() {}
            };

            addProfileBadge(badge);
            registeredBadges.push(badge);
        }
    },

    stop() {
        for (const badge of registeredBadges) {
            removeProfileBadge(badge);
        }
        registeredBadges.length = 0;
    },

    settingsAboutToChange() {
        this.stop();
    },
    settingsChanged() {
        this.start();
    },
});