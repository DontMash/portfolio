<script lang="ts">
  import { Canvas, T } from "@threlte/core";
</script>

<figure class="h-full w-full">
  <Canvas>
    <T.PerspectiveCamera position={[0, 0, 5]} fov={40} makeDefault />
    <!-- <T.OrthographicCamera position={[0, 0, 10]} makeDefault /> -->

    <T.Mesh position={[-1.25, 1.25, 0]}>
      <T.BoxGeometry args={[1, 1, 0.5]} />
      <T.MeshBasicMaterial />
    </T.Mesh>

    <T.Mesh>
      <T.SphereGeometry args={[0.5]} />
      <T.MeshBasicMaterial />
    </T.Mesh>

    <T.Mesh position={[-1.25, -1, 0]}>
      <T.ConeGeometry args={[0.5, 1]} />
      <T.MeshBasicMaterial />
    </T.Mesh>
  </Canvas>

  <figcaption class="sr-only">Composite shapes illustration</figcaption>
</figure>
