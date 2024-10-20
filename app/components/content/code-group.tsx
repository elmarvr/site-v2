import TabsContent from "../ui/tabs/tabs-content.vue";
import TabsList from "../ui/tabs/tabs-list.vue";
import TabsTrigger from "../ui/tabs/tabs-trigger.vue";
import Tabs from "../ui/tabs/tabs.vue";

export default defineComponent(() => {
  const slots = useSlots();

  return () => {
    const tabs = slots.default?.().filter(isCodeBlock) ?? [];
    const defaultValue = tabs[0]?.props.filename;

    return (
      <Tabs
        key={defaultValue}
        defaultValue={defaultValue}
        class="bg-card border rounded"
      >
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger value={tab.props.filename} key={tab.props.filename}>
              {tab.props.filename}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent
            key={tab.props.filename}
            value={tab.props.filename}
            class="mt-0"
          >
            {h(tab)}
          </TabsContent>
        ))}
      </Tabs>
    );
  };
});

function isCodeBlock(
  node: VNode
): node is VNode & { props: { filename: string } } {
  return node.props?.filename;
}
