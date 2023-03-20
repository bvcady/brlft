import { PageLayout } from "../layout/PageLayout";

const BorrelPage = () => {
  const borrel = true;
  return <PageLayout>{borrel && "Borrel"}</PageLayout>;
};

export default BorrelPage;
