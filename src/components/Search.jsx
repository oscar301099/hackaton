
const Search = () => {
return (
<div class="md:w-6/7 mx-auto flex flex-grow items-center justify-center px-4">
  <div class="relative w-full max-w-md">
    <input
      type="text"
      class="w-full rounded-lg border bg-clientLightSecondary py-2 pl-10 pr-4 text-clientLightTextColor focus:border-transparent focus:outline-none focus:ring-2 dark:bg-clientDarkSecondary dark:text-clientDarkTextColor sm:py-1 sm:pl-8 sm:pr-3 md:py-2 md:pl-10 md:pr-4"
      placeholder="Search"
    />
    <div
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-clientLightTextColor dark:text-clientDarkTextColor"
    >
      <i class="bx bx-search-alt-2 bx-xs md:bx-sm"></i>
    </div>
  </div>
</div>
  )
}

export default Search