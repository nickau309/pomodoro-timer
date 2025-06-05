import { usePomoTimer } from "../../contexts";
import Header from "./Header";
import Layout from "./Layout";
import Main from "./Main";

export default function Root() {
  const { setting, data, isTiming } = usePomoTimer();

  const color = setting.theme[data.slot];
  const initTimeLeftInSec = setting.duration[data.slot] * 60;
  const timeLeft = setting.duration[data.slot] * 60 * 1000 - data.timePass;

  return (
    <Layout color={color}>
      <Header setting={setting} />
      <Main
        color={color}
        data={data}
        initTimeLeftInSec={initTimeLeftInSec}
        isTiming={isTiming}
        timeLeft={timeLeft}
      />
    </Layout>
  );
}
