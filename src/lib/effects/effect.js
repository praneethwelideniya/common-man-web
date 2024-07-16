import etro from "etro";

export default class SaturationEffect extends etro.effect.Shader {
  constructor(options = {}) {
    super({
      fragmentSource: `
        precision highp float;

        uniform sampler2D u_Source;
        uniform float u_Saturation;

        varying vec2 v_TextureCoord;

        void main() {
          vec4 color = texture2D(u_Source, v_TextureCoord);
          float luminance = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
          gl_FragColor = vec4(mix(vec3(luminance), color.rgb, u_Saturation), color.a);
        }
      `,
      uniforms: {
        saturation: "1f",
      },
    });

    this.saturation = options.saturation || 1;
  }
}
