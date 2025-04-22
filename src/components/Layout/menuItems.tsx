type Route = {
  slug: string;
  name: string;
};

export const DashboardRoute: Route = {
  slug: "/",
  name: "Dashboard",
};

export const MealsRoute: Route = {
  slug: "/meals",
  name: "Meals",
};

export const ActivityRoute: Route = {
  slug: "/activity",
  name: "Activity",
};

export const PersonalInfoRoute: Route = {
  slug: "/personal",
  name: "My Information",
};

export const Routes: Route[] = [DashboardRoute, MealsRoute, ActivityRoute, PersonalInfoRoute];
