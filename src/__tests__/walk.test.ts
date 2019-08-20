import { join, resolve } from "path";
import walker from "../walk";

const fixtureDir = resolve(join(__dirname, "__fixture__"));

describe("Walker", () => {
  it("Read directory file contents", async () => {
    const subject = await walker(fixtureDir);
    expect(subject).toMatchSnapshot();
  });
});
