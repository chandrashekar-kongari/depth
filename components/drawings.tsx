type DrawingProps = {
  className?: string;
};

function SheetFrame({
  children,
  title,
  revision,
}: DrawingProps & {
  children: React.ReactNode;
  title: string;
  revision: string;
}) {
  return (
    <svg
      viewBox="0 0 860 520"
      className="h-full w-full text-foreground-primary"
      role="img"
      aria-label={`${title}, revision ${revision}, illustrative drawing`}
    >
      <rect
        x="18"
        y="18"
        width="824"
        height="484"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.18"
      />
      <rect
        x="28"
        y="28"
        width="804"
        height="464"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.1"
      />
      {children}
      <g fill="none" stroke="currentColor" strokeOpacity="0.45">
        <path d="M560 392h250v88H560z" />
        <path d="M560 422h250M700 392v88" />
      </g>
      <g
        className="fill-foreground"
        fontFamily="var(--font-source-code-pro), ui-monospace, monospace"
        fontSize="11"
      >
        <text x="574" y="412" fill="currentColor" opacity="0.55">
          DEPTH · ILLUSTRATIVE
        </text>
        <text x="714" y="412" fill="currentColor" opacity="0.55">
          {revision}
        </text>
        <text x="574" y="448" fill="currentColor">
          {title}
        </text>
        <text x="714" y="448" fill="currentColor" opacity="0.7">
          SHEET 1
        </text>
        <text x="574" y="468" fill="currentColor" opacity="0.55">
          NOT A RELEASED DRAWING
        </text>
      </g>
    </svg>
  );
}

export function BracketDrawing({ className }: DrawingProps) {
  return (
    <div className={className}>
      <SheetFrame title="BRG-2041 BRACKET, HOUSING" revision="REV C">
        <g fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M86 168h250v150H86z" />
          <path
            d="M86 228h250M86 288h250M148 168v150M236 168v150"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <circle cx="148" cy="228" r="16" />
          <circle cx="236" cy="228" r="16" />
          <circle cx="148" cy="288" r="16" />
          <circle cx="236" cy="288" r="16" />
          <circle cx="148" cy="228" r="7" />
          <circle cx="236" cy="228" r="7" />
          <circle cx="148" cy="288" r="7" />
          <circle cx="236" cy="288" r="7" />
        </g>
        <g fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M430 188h92v130h-36v-46h-56z" />
          <path d="M430 242h56" strokeDasharray="5 4" strokeOpacity="0.7" />
          <path d="M466 188v84" strokeDasharray="5 4" strokeOpacity="0.7" />
        </g>
        <g stroke="var(--brand-base)" strokeWidth="1" fill="none">
          <path d="M120 228h56M208 228h56" strokeDasharray="8 4" />
          <path d="M148 200v56M236 200v56" strokeDasharray="8 4" />
        </g>
        <g
          stroke="currentColor"
          strokeOpacity="0.55"
          fill="none"
          strokeWidth="1"
        >
          <path d="M86 150h250" />
          <path d="M86 150v6M336 150v6" />
          <path d="M70 168v150" />
          <path d="M70 168h6M70 318h6" />
          <path d="M430 168h92" />
          <path d="M430 168v6M522 168v6" />
        </g>
        <g
          fill="currentColor"
          fontFamily="var(--font-source-code-pro), ui-monospace, monospace"
          fontSize="12"
          opacity="0.75"
        >
          <text x="176" y="144">
            120.0
          </text>
          <text x="46" y="248">
            72.0
          </text>
          <text x="448" y="162">
            18.0
          </text>
          <text x="96" y="360">
            FRONT
          </text>
          <text x="430" y="360">
            SIDE
          </text>
        </g>
      </SheetFrame>
    </div>
  );
}

export function ShaftDrawing({ className }: DrawingProps) {
  return (
    <div className={className}>
      <SheetFrame title="SHF-1180 SHAFT, DRIVE" revision="REV B">
        <g fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M90 230h120v60H90z" />
          <path d="M210 206h180v108H210z" />
          <path d="M390 188h150v144H390z" />
          <path d="M540 214h130v92H540z" />
          <path
            d="M90 260h580"
            stroke="var(--brand-base)"
            strokeDasharray="8 4"
            strokeWidth="1"
          />
        </g>
        <g stroke="currentColor" strokeOpacity="0.5" fill="none">
          <path d="M90 186v148M210 186v148M390 170v180M540 170v180M670 186v148" />
          <path d="M90 186h580" />
        </g>
        <g
          fill="currentColor"
          fontFamily="var(--font-source-code-pro), ui-monospace, monospace"
          fontSize="12"
          opacity="0.75"
        >
          <text x="118" y="176">
            42
          </text>
          <text x="270" y="176">
            68
          </text>
          <text x="430" y="160">
            54
          </text>
          <text x="575" y="176">
            48
          </text>
          <text x="90" y="390">
            Ø24
          </text>
          <text x="250" y="390">
            Ø32
          </text>
          <text x="430" y="390">
            Ø40
          </text>
          <text x="575" y="390">
            Ø28
          </text>
        </g>
      </SheetFrame>
    </div>
  );
}

export function CoverDrawing({ className }: DrawingProps) {
  return (
    <div className={className}>
      <SheetFrame title="CVR-0904 COVER, END" revision="REV A">
        <g fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="250" cy="250" r="120" />
          <circle cx="250" cy="250" r="78" />
          <circle cx="250" cy="250" r="28" />
          <circle cx="250" cy="148" r="10" />
          <circle cx="338" cy="198" r="10" />
          <circle cx="338" cy="302" r="10" />
          <circle cx="250" cy="352" r="10" />
          <circle cx="162" cy="302" r="10" />
          <circle cx="162" cy="198" r="10" />
        </g>
        <g stroke="var(--brand-base)" fill="none" strokeDasharray="7 4">
          <path d="M250 110v280M130 250h240" />
        </g>
        <g
          fill="currentColor"
          fontFamily="var(--font-source-code-pro), ui-monospace, monospace"
          fontSize="12"
          opacity="0.75"
        >
          <text x="430" y="180">
            Ø160.0 BOLT CIRCLE
          </text>
          <text x="430" y="210">
            6 × Ø8.5
          </text>
          <text x="430" y="240">
            Ø36.0 BORE
          </text>
          <text x="430" y="270">
            THK 6.0
          </text>
        </g>
      </SheetFrame>
    </div>
  );
}

export function Thumb({
  kind,
}: {
  kind: "bracket" | "shaft" | "cover" | "plate";
}) {
  return (
    <svg
      viewBox="0 0 72 48"
      className="h-9 w-14 text-foreground-primary"
      aria-hidden
    >
      <rect
        x="1"
        y="1"
        width="70"
        height="46"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.25"
      />
      {kind === "bracket" ? (
        <path
          d="M10 12h28v24H10zM18 20h6M32 20h6M16 18v6M22 18v6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      ) : null}
      {kind === "shaft" ? (
        <path
          d="M8 20h12v8H8zM20 16h18v16H20zM38 14h16v20H38zM54 18h10v12H54z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      ) : null}
      {kind === "cover" ? (
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="28" cy="24" r="12" />
          <circle cx="28" cy="24" r="4" />
        </g>
      ) : null}
      {kind === "plate" ? (
        <path
          d="M12 14h40v20H12zM20 14v20M44 14v20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      ) : null}
    </svg>
  );
}
