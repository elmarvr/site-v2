import { useLiveQuery } from "./use-live-query";
import { db } from "./db";

const MesageList = () => {
  const { data, error } = useLiveQuery({
    query: db.query.messages.findMany(),
    queryKey: ["messages"],
  });

  //etc...
};

const MessageSingle = (props: { id: number }) => {
  const { data, error } = useLiveQuery({
    query: db.query.messages.findFirst({
      where: (fields, { eq }) => eq(fields.id, props.id),
    }),
    queryKey: ["message", props.id],
  });

  //even more...
};
