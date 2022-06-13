type TabOneProps = {
  title: string;
};

const TabOne: React.FC<TabOneProps> = ({ title }) => {
  return <div>tab one {title}</div>;
};

type TabTwoProps = TabOneProps & {
  id: number;
};

const TabTwo: React.FC<TabTwoProps> = ({ id, title }) => {
  return (
    <div>
      {id} {title}
    </div>
  );
};

type TabThreeProps = {
  name: string;
};

const TabThree: React.FC<TabThreeProps> = ({ name }) => {
  return <div>{name}</div>;
};

const componentsMap = {
  TabOne,
  TabTwo,
  TabThree,
};

type PropsOf<T> = T extends React.ComponentType<infer Props> ? Props : never;

type RenderProps<T extends keyof typeof componentsMap> = {
  type: T;
  params: PropsOf<typeof componentsMap[T]>;
};

export const Render = <T extends keyof typeof componentsMap>({
  params,
  type,
}: RenderProps<T>) => {
  const Component = componentsMap[type];
  return <Component {...(params as any)} />;
};

const Test = () => {
  return (
    <>
      <Render type="TabOne" params={{ title: "Test tab one" }} />
      <Render type="TabThree" params={{ name: "Test tab three" }} />
      <Render type="TabTwo" params={{ id: 3, title: "Test tab two" }} />

      <Render type="TabTwo" params={{ id: "2", title: "Test tab two" }} /> // error: (prop id) Type 'string' is not assignable to type 'number'.
      <Render type="TabThree" params={{ id: "2", title: "Test tab two" }} /> //error: (propd id, prop title) Type '{ id: string; title: string; }' is not assignable to type 'TabThreeProps'.
    </>
  );
};
