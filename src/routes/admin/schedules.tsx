import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/schedules")({
  beforeLoad: () => { throw redirect({ to: "/admin/ministries" }); },
});
