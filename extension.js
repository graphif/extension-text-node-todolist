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
        first.color = { _: "Color", r: 0, g: 98, b: 76 };
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
        // 192, 31, 36
        first.color = { _: "Color", r: 0, g: 0, b: 0, a: 0 };
      } else {
        await first.rename(`❌ ${text}`);
        first.color = { _: "Color", r: 192, g: 31, b: 36 };
      }
    }
  }),
);