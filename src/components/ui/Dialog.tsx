import React, { useContext } from "react";
import { cn } from "@/utils/libs/tailwind/helper";
import { X } from "lucide-react";
import { SeparatorHorizontal } from "./Separator";
import { Button } from "./Button";
import { LangContext } from "@/utils/providers";
import { i18n } from "@/i18n/translations";
import type { PropsWithChildren, SyntheticEvent } from "react";

interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
	noForm?: boolean;
	onSubmitForm?: (ev: React.FormEvent<HTMLFormElement>) => void;
}

const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
	({ noForm, children, className, onSubmitForm, ...props }, ref) => {
		return (
			<dialog
				className={cn(
					"fixed block left-1/2 top-1/2 w-[65vh] p-4 z-10",
					"translate-x-[-50%] translate-y-[-40%]",
					"bg-popover text-popover-foreground rounded-md border-[1px]",
					"opacity-0 invisible transition-fade open:opacity-100 open:translate-y-[-50%] open:visible",
					className,
				)}
				ref={ref}
				{...props}
			>
				{noForm ? (
					children
				) : (
					<form onSubmit={onSubmitForm} className="flex flex-col h-full" method="dialog" noValidate>
						{children}
					</form>
				)}
			</dialog>
		);
	},
);

Dialog.displayName = "Dialog";

const DialogHeader: React.FC<{ title: string; noForm?: boolean }> = ({ title, noForm }) => {
	const lang = useContext(LangContext);
	return (
		<>
			<div className="flex items-center justify-between pb-2">
				<h3>{title}</h3>
				<Button
					onClick={(ev) => {
						if (noForm) {
							(ev.currentTarget.closest("dialog") as HTMLDialogElement)?.close();
						}
					}}
					outline={false}
					fill={false}
					data-type="cancel"
					type={noForm ? "button" : "submit"}
					aria-label={i18n[lang]("CLOSE")}
					autoFocus
				>
					<X className="w-5 h-5 cursor-pointer" />
				</Button>
			</div>
			<SeparatorHorizontal />
		</>
	);
};

const DialogBody: React.FC<PropsWithChildren> = ({ children }) => {
	return <div className="flex-1 py-4">{children}</div>;
};

const DialogFooter: React.FC<PropsWithChildren & { noForm?: boolean; afterSubmit?: (ev: SyntheticEvent) => void }> = ({
	noForm,
	afterSubmit,
	children,
}) => {
	const lang = useContext(LangContext);
	return (
		<div className="flex items-center gap-2">
			{children}
			<Button
				onClick={(ev) => {
					if (noForm) {
						(ev.currentTarget.closest("dialog") as HTMLDialogElement)?.close();
					}
				}}
				className="ml-auto"
				type={noForm ? "button" : "submit"}
				data-type="cancel"
				fill={false}
				aria-label={i18n[lang]("CLOSE")}
			>
				{i18n[lang]("CANCEL")}
			</Button>
			<Button
				onClick={(ev) => {
					if (noForm) {
						(ev.currentTarget.closest("dialog") as HTMLDialogElement)?.close();
					}

					afterSubmit?.(ev);
				}}
				type={noForm ? "button" : "submit"}
			>
				{i18n[lang]("SAVE")}
			</Button>
		</div>
	);
};

export { Dialog, DialogHeader, DialogBody, DialogFooter };
