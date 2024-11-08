import Page, { PageDetails } from "~/components/Page";
import { Route as RouteIcon } from "lucide-react";
import { APIExplorerDemo, Demo, DemoDescription, DemoPlayground } from "~/components/Demo";

const PageContent = {
  title: "Route Worker Modules",
  gradient: "from-pink-500 via-purple-500 to-pink-500",
  description: "The Route module is used to define the routes for your application.",
  details: "The Route module is used to define the routes for your application. It is used to define the routes for your application. It is used to define the routes for your application.",
  icon: <RouteIcon size={32} />
}

export default function Route() {
  return (
    <Page
      {...PageContent}
    >
      <PageDetails
        {...PageContent}
      />

      <Demo>
        <DemoDescription>
        Here you can find an interactive demo of our stuffs. Explore different sections, try out code snippets, and see how our documentation can help you build better applications.
        </DemoDescription>
        <DemoPlayground>
          <APIExplorerDemo
            invokeApi={() => {}}
            apiResponse={null}
            name="Worker Loader"
            btnText="Demo"
            isLoading={false}
            loadingText="Loading..."
          />
          <APIExplorerDemo
            invokeApi={() => {}}
            apiResponse={null}
            name="Worker Action"
            btnText="Worker Action"
            isLoading={false}
            loadingText="Loading..."
          />
        </DemoPlayground>
      </Demo>
    </Page>
  )
}
