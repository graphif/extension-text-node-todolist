/**
 * OKK，ERR
 */
await prg.keybinds_register(
  "smartOKK",
  { $lucide: "User" },
  "o k k",
  Comlink.proxy(async () => {
    const project = await prg.tabs_getCurrentProject();
    const stageManager = await project.stageManager;
    const selectedEntities = await stageManager.getSelectedEntities();
    const first = await selectedEntities[0];
    const text = await first.text;
    const color = await first.color;
    if (text && color) {
      if (text.startsWith("✅ ")) {
        await first.rename(text.slice(2));
        first.color = { _: "Color", r: 0, g: 0, b: 0, a: 0 };
      } else {
        await first.rename(`✅ ${text}`);
        // 52, 103, 53
        first.color = { _: "Color", r: 52, g: 103, b: 53 };
      }
    }
  }),
);

await prg.keybinds_register(
  "smartERR",
  { $lucide: "User" },
  "e r r",
  Comlink.proxy(async () => {
    const project = await prg.tabs_getCurrentProject();
    const stageManager = await project.stageManager;
    const selectedEntities = await stageManager.getSelectedEntities();
    const first = await selectedEntities[0];
    const text = await first.text;
    const color = await first.color;
    if (text && color) {
      if (text.startsWith("❌ ")) {
        await first.rename(text.slice(2));
        first.color = { _: "Color", r: 0, g: 0, b: 0, a: 0 };
      } else {
        await first.rename(`❌ ${text}`);
        // 53, 12, 14
        first.color = { _: "Color", r: 52, g: 12, b: 14 };
      }
    }
  }),
);