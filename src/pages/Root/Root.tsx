import { usePomoTimer } from "../../contexts";
import Header from "./Header";
import Layout from "./Layout";
import Main from "./Main";

export default function Root() {
  const { setting, data, status } = usePomoTimer();

  const color = setting.theme[data.slot];
  const initTimeLeftInSec = setting.duration[data.slot] * 60;

  return (
    <Layout color={color}>
      <Header setting={setting} />
      <Main
        color={color}
        data={data}
        initTimeLeftInSec={initTimeLeftInSec}
        status={status}
      />
    </Layout>
  );
}
