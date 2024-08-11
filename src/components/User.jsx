
const User = () => {
return (
<div class="relative">
  <button
    id="avatar-button"
    class="flex items-center rounded-full bg-clientLightSecondary p-2 transition-shadow duration-200 hover:shadow-lg focus:outline-none dark:bg-clientDarkSecondary"
  >
    <Image src="" alt="" class="h-8 w-8 rounded-full" width="" height="" />
  </button>

  <div
    id="dropdown-menu"
    class="absolute right-0 mt-2 hidden w-48 origin-top-right scale-95 transform-gpu rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-transform duration-200 focus:outline-none dark:bg-clientDarkSecondary"
    aria-labelledby="avatar-button"
  >
    <div class="p-2">
      <a
        href="#"
        class="flex items-center rounded-md px-4 py-2 text-clientLightTextColor transition-colors duration-200 dark:text-clientDarkTextColor"
      >
        <i class="bx bx-user mr-2 text-clientLightTextColor dark:text-clientDarkTextColor"></i>
        Profile
      </a>
      <a
        href="/"
        class="flex items-center rounded-md px-4 py-2 text-clientLightTextColor transition-colors duration-200 dark:text-clientDarkTextColor"
      >
        <i class="bx bx-cog mr-2 text-clientLightTextColor dark:text-clientDarkTextColor"></i>
        Settings
      </a>
      <a
        href="/"
        class="flex items-center rounded-md px-4 py-2 text-clientLightTextColor transition-colors duration-200 dark:text-clientDarkTextColor"
      >
        <i class="bx bx-log-in-circle mr-2 text-clientLightTextColor dark:text-clientDarkTextColor"
        ></i>
        Log out
      </a>
    </div>
  </div>
</div>
  )
}

export default User



