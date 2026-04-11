import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCurrentUser } from "@/hooks/use-current-user";
import { Skeleton } from "@/components/ui/skeleton";


export const AvatarBtn = () => {
  const {data, isLoading, isError, error} = useCurrentUser()

  if(isLoading ) return (
    <Skeleton className="h-10 w-10 rounded-full" />
  )

  if(isError || !data) return (
    <Button className="dark:bg-white bg-primary rounded-full flex items-center h-10 px-1.5 py-2">
      <Avatar >
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{error?.message ? error.message.charAt(0) : "CN"}</AvatarFallback>
      </Avatar>
    </Button>
  )

  const user = data.user;

  if (!user) return (
    <Button className="dark:bg-white bg-primary rounded-full flex items-center h-10 px-1.5 py-2">
      <Avatar >
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Button>
  )

  return (
    <Button className="dark:bg-white bg-primary rounded-full flex items-center h-10 px-1.5 py-2">
      <Avatar >
        <AvatarImage src={user.prefs?.avatarUrl} />
        <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
      </Avatar>

      <h1 className="dark:text-primary text-white pr-2">
        {user.name || "User"}
      </h1>
    </Button>
  )
}
