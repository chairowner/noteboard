import { FC, lazy } from "react";

export const LazyMain: FC = lazy(() => import("./MainPage"));
