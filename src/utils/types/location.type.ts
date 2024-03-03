type createLocationType = {
  name: string;
};
type locationType = createLocationType & {
  id: string;
  timestamp: Date;
};
