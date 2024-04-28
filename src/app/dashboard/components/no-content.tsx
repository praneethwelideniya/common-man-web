import CreateButton, {
  CreateButtonType,
} from "@/app/dashboard/components/create-button";

function NoContenctUi({
  type,
  route,
  title,
}: {
  type: CreateButtonType;
  route: string;
  title: string;
}) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm py-32 bg-white">
      <div className="flex flex-col items-center gap-1 text-centr space-y-8">
        <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
        <CreateButton size="lg" type={type} route={route} />
      </div>
    </div>
  );
}

export default NoContenctUi;
