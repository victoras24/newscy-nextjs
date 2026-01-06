import {
	signInWithEmail,
	signInWithGoogleAuth,
} from "../lib/supabase/actions/auth";
import { cn } from "../lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./Card";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={signInWithEmail}>
						<div className="gap-5 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4 group/field-group @container/field-group flex w-full flex-col">
							<div className="flex-col [&>*]:w-full [&>.sr-only]:w-auto">
								<label
									className="has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-data-checked:bg-primary/5 has-data-checked:border-primary dark:has-data-checked:bg-primary/10 gap-2 group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-none has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-2 group/field-label peer/field-label flex w-fit leading-snug gap-2 text-xs leading-none group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed"
									htmlFor="email"
								>
									Email
								</label>
								<input
									className="dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 h-8 rounded-none border bg-transparent px-2.5 py-1 text-xs transition-colors file:h-6 file:text-xs file:font-medium focus-visible:ring-1 aria-invalid:ring-1 md:text-xs file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
									id="email"
									type="email"
									name="email"
									placeholder="m@example.com"
									required
								/>
							</div>
							<div className="flex-col [&>*]:w-full [&>.sr-only]:w-auto">
								<label
									className="has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-data-checked:bg-primary/5 has-data-checked:border-primary dark:has-data-checked:bg-primary/10 gap-2 group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-none has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-2 group/field-label peer/field-label flex w-fit leading-snug gap-2 text-xs leading-none group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed"
									htmlFor="password"
								>
									Password
								</label>
								<input
									className="dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 h-8 rounded-none border bg-transparent px-2.5 py-1 text-xs transition-colors file:h-6 file:text-xs file:font-medium focus-visible:ring-1 aria-invalid:ring-1 md:text-xs file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
									id="password"
									name="password"
									type="password"
									required
								/>
							</div>
							<div className="gap-5 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4 group/field-group @container/field-group flex w-full flex-col">
								<div className="flex-col [&>*]:w-full [&>.sr-only]:w-auto">
									<button
										className="h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 bg-primary text-primary-foreground [a]:hover:bg-primary/80 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-none border border-transparent bg-clip-padding text-xs font-medium focus-visible:ring-1 aria-invalid:ring-1 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none hover:cursor-pointer"
										type="submit"
									>
										Login
									</button>
									<button
										className="h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-none border border-transparent bg-clip-padding text-xs font-medium focus-visible:ring-1 aria-invalid:ring-1 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none hover:cursor-pointer"
										type="button"
										onClick={signInWithGoogleAuth}
									>
										Login with Google
									</button>
									<p className="text-center text-muted-foreground text-left text-xs/relaxed [[data-variant=legend]+&]:-mt-1.5 leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance px-6 text-center">
										Don't have an account? <a href="/">Sign up</a>
									</p>
								</div>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
