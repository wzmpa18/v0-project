Set-Location "e:/v0-project"

$json = @'
{
  "asset": { "version": "2.0" },
  "scene": 0,
  "scenes": [{ "nodes": [0] }],
  "nodes": [{ "mesh": 0, "name": "skin" }],
  "meshes": [{ "primitives": [{ "attributes": { "POSITION": 1 }, "indices": 0 }] }],
  "buffers": [{ "byteLength": 44 }],
  "bufferViews": [
    { "buffer": 0, "byteOffset": 0, "byteLength": 6, "target": 34963 },
    { "buffer": 0, "byteOffset": 8, "byteLength": 36, "target": 34962 }
  ],
  "accessors": [
    { "bufferView": 0, "byteOffset": 0, "componentType": 5123, "count": 3, "type": "SCALAR", "max": [2], "min": [0] },
    { "bufferView": 1, "byteOffset": 0, "componentType": 5126, "count": 3, "type": "VEC3", "max": [0.5, 0.5, 0], "min": [-0.5, -0.5, 0] }
  ]
}
'@

$jsonBytes = [System.Text.Encoding]::UTF8.GetBytes($json)
$jp = (4 - ($jsonBytes.Length % 4)) % 4
if ($jp -gt 0) {
  $tmp = New-Object byte[] ($jsonBytes.Length + $jp)
  [Array]::Copy($jsonBytes, $tmp, $jsonBytes.Length)
  for ($i = 0; $i -lt $jp; $i++) { $tmp[$jsonBytes.Length + $i] = 32 }
  $jsonBytes = $tmp
}

$bin = New-Object byte[] 44

function Write-UInt16LE([byte[]]$target, [int]$offset, [UInt16]$value) {
  $bytes = [BitConverter]::GetBytes($value)
  [Array]::Copy($bytes, 0, $target, $offset, 2)
}

function Write-FloatLE([byte[]]$target, [int]$offset, [single]$value) {
  $bytes = [BitConverter]::GetBytes($value)
  [Array]::Copy($bytes, 0, $target, $offset, 4)
}

Write-UInt16LE $bin 0 0
Write-UInt16LE $bin 2 1
Write-UInt16LE $bin 4 2
# offset 6-7 为4字节对齐填充

Write-FloatLE $bin 8  -0.5
Write-FloatLE $bin 12 -0.5
Write-FloatLE $bin 16  0.0
Write-FloatLE $bin 20  0.5
Write-FloatLE $bin 24 -0.5
Write-FloatLE $bin 28  0.0
Write-FloatLE $bin 32  0.0
Write-FloatLE $bin 36  0.5
Write-FloatLE $bin 40  0.0

$total = 12 + 8 + $jsonBytes.Length + 8 + $bin.Length
$out = New-Object System.IO.MemoryStream
$w = New-Object System.IO.BinaryWriter($out)
$w.Write([UInt32]0x46546C67)
$w.Write([UInt32]2)
$w.Write([UInt32]$total)
$w.Write([UInt32]$jsonBytes.Length)
$w.Write([UInt32]0x4E4F534A)
$w.Write($jsonBytes)
$w.Write([UInt32]$bin.Length)
$w.Write([UInt32]0x004E4942)
$w.Write($bin)

[System.IO.File]::WriteAllBytes("public/models/tcm-human-base.glb", $out.ToArray())
$w.Close()
$out.Close()

Get-Item "public/models/tcm-human-base.glb" | Select-Object FullName, Length
