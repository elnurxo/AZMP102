import {
  Card,
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

function App() {
  return (
    <>
      <header>
        <Navbar fluid rounded>
          <NavbarBrand href="https://flowbite-react.com">
            <img
              src="https://flowbite.s3.amazonaws.com/brand/logo-light/type/flowbite-logo.png"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Flowbite React
            </span>
          </NavbarBrand>
          <div className="flex md:order-2">
            <Button>Get started</Button>
            <NavbarToggle />
          </div>
          <NavbarCollapse>
            <NavbarLink href="#" active>
              Home
            </NavbarLink>
            <NavbarLink href="#">About</NavbarLink>
            <NavbarLink href="#">Services</NavbarLink>
            <NavbarLink href="#">Pricing</NavbarLink>
            <NavbarLink href="#">Contact</NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </header>
      <div style={{ width: "90%" }} className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <Card
            className="max-w-sm"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc="https://media.istockphoto.com/id/146059113/photo/iguana.jpg?s=612x612&w=0&k=20&c=ddyOBJUQbN3B6gWgI04jHzFdnycwUkF7TzwRqFKHqPE="
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </Card>
          <Card
            className="max-w-sm"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc="https://media.istockphoto.com/id/146059113/photo/iguana.jpg?s=612x612&w=0&k=20&c=ddyOBJUQbN3B6gWgI04jHzFdnycwUkF7TzwRqFKHqPE="
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </Card>
          <Card
            className="max-w-sm"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc="https://media.istockphoto.com/id/146059113/photo/iguana.jpg?s=612x612&w=0&k=20&c=ddyOBJUQbN3B6gWgI04jHzFdnycwUkF7TzwRqFKHqPE="
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </Card>
          <Card
            className="max-w-sm"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc="https://media.istockphoto.com/id/146059113/photo/iguana.jpg?s=612x612&w=0&k=20&c=ddyOBJUQbN3B6gWgI04jHzFdnycwUkF7TzwRqFKHqPE="
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
