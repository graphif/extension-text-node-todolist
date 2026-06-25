/**
 * OKK，ERR，WAR
 */
const PREFIXES = [
  { emoji: "✅ ", color: { _: "Color", r: 52, g: 103, b: 53 } },
  { emoji: "❌ ", color: { _: "Color", r: 52, g: 12, b: 14 } },
  { emoji: "⚠️ ", color: { _: "Color", r: 200, g: 170, b: 0 } },
];
const DEFAULT_COLOR = { _: "Color", r: 0, g: 0, b: 0, a: 0 };

function stripPrefix(text) {
  for (const p of PREFIXES) {
    if (text.startsWith(p.emoji)) {
      return { stripped: text.slice(p.emoji.length), found: p };
    }
  }
  return { stripped: text, found: null };
}

async function applyStateAll(targetPrefix) {
  const project = await prg.tabs_getCurrentProject();
  const stageManager = await project.stageManager;
  const selectedEntities = await stageManager.getSelectedEntities();
  for (const entity of selectedEntities) {
    const text = await entity.text;
    const color = await entity.color;
    if (!text || !color) continue;
    const { stripped, found } = stripPrefix(text);
    if (found && found.emoji === targetPrefix.emoji) {
      await entity.rename(stripped);
      entity.color = DEFAULT_COLOR;
    } else {
      await entity.rename(targetPrefix.emoji + stripped);
      entity.color = targetPrefix.color;
    }
  }
}

await prg.keybinds_register(
  "smartOKK",
  { $lucide: "User" },
  "o k k",
  Comlink.proxy(async () => applyStateAll(PREFIXES[0])),
);

await prg.keybinds_register(
  "smartERR",
  { $lucide: "User" },
  "e r r",
  Comlink.proxy(async () => applyStateAll(PREFIXES[1])),
);

await prg.keybinds_register(
  "smartWAR",
  { $lucide: "User" },
  "w a r",
  Comlink.proxy(async () => applyStateAll(PREFIXES[2])),
);