### Mac Chrome 调试 iOS 设备

使用 homebrew 安装，将下面命令依次拷贝到终端命令行中

```shell
brew unlink libimobiledevice ios-webkit-debug-proxy usbmuxd
brew uninstall --force libimobiledevice ios-webkit-debug-proxy usbmuxd
brew install --HEAD usbmuxd
brew install --HEAD libimobiledevice
brew install --HEAD ios-webkit-debug-proxy
```

Chrome 打开 IOS 调试

`remotedebug_ios_webkit_adapter --port=9000`
