interface SpeedometerProps {
  speed?: number;
  className?: string;
}

export function Speedometer({ speed = 0, className }: SpeedometerProps) {
  return (
    <svg className={className} viewBox="0 0 80 61">
      <g transform="matrix(1.56863,0,0,1.56863,-20.3922,-21.9608)">
        <path d="M60.584,52.25C62.822,48.374 64,43.976 64,39.5C64,25.426 52.574,14 38.5,14C24.426,14 13,25.426 13,39.5C13,43.976 14.178,48.374 16.416,52.25L60.584,52.25Z" />
      </g>
      <g>
        <g transform="matrix(1.34793,0,0,1.34793,38.7299,15.9878)">
          <text
            x="13.103px"
            y="30.149px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: 12,
              fill: "white",
            }}
          >
            60
          </text>
        </g>
        <g transform="matrix(1.34793,0,0,1.34793,-11.8796,15.9878)">
          <text
            x="13.103px"
            y="30.149px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: 12,
              fill: "white",
            }}
          >
            0
          </text>
        </g>
        <g transform="matrix(1.34793,0,0,1.34793,13.3896,-24.9278)">
          <text
            x="13.103px"
            y="30.149px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: 12,
              fill: "white",
            }}
          >
            30
          </text>
        </g>
        <g transform="matrix(0.872083,0,0,0.872083,-7.33755,8.58016)">
          <text
            x="13.103px"
            y="30.149px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: 12,
              fill: "rgb(170,170,170)",
            }}
          >
            10
          </text>
        </g>
        <g transform="matrix(0.872083,0,0,0.872083,3.13542,-5.77038)">
          <text
            x="13.103px"
            y="30.149px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: 12,
              fill: "rgb(170,170,170)",
            }}
          >
            20
          </text>
        </g>
        <g transform="matrix(0.872083,0,0,0.872083,42.7383,-5.77038)">
          <text
            x="13.103px"
            y="30.149px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: 12,
              fill: "rgb(170,170,170)",
            }}
          >
            40
          </text>
        </g>
        <g transform="matrix(0.872083,0,0,0.872083,52.9098,8.58016)">
          <text
            x="13.103px"
            y="30.149px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: 12,
              fill: "rgb(170,170,170)",
            }}
          >
            50
          </text>
        </g>
      </g>
      <g
        transform={`translate(40 40) rotate(${
          speed * (240 / 60) - 120
        }) translate(-40 -40)`}
      >
        <g transform="matrix(1,0,0,-1,13,78)">
          <path
            d="M27,8C27,8 25,29 25,38C25,39.104 25.896,40 27,40C28.104,40 29,39.104 29,38C29,29 27,8 27,8Z"
            style={{
              fill: "rgb(255,0,0)",
              fillOpacity: 0,
            }}
          />
        </g>
        <g transform="matrix(1,0,0,1,13,2)">
          <path
            d="M27,8C27,8 25,29 25,38C25,39.104 25.896,40 27,40C28.104,40 29,39.104 29,38C29,29 27,8 27,8Z"
            fill="rgb(255,0,0)"
          />
        </g>
      </g>
      <g transform="matrix(1.66667,0,0,1.66667,-8.33334,-15)">
        <circle cx="29" cy="33" r="3" fill="rgb(77,77,77)" />
      </g>
    </svg>
  );
}
